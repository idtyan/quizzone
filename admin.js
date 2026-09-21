const db=supabase.createClient(QUIZIK.url,QUIZIK.key);
const $=s=>document.querySelector(s);
async function show(){
 const {data:{user}}=await db.auth.getUser();
 if(!user)return;
 const {data,error}=await db.from('admins').select('user_id').eq('user_id',user.id).maybeSingle();
 if(error||!data){$('#loginMsg').textContent='У аккаунта нет прав администратора.';return}
 $('#login').classList.add('hidden');$('#dashboard').classList.remove('hidden');
}
$('#loginBtn').onclick=async()=>{
 $('#loginMsg').textContent='Входим…';
 const {error}=await db.auth.signInWithPassword({email:$('#email').value.trim(),password:$('#password').value});
 if(error){$('#loginMsg').textContent=error.message;return}
 await show();
};
$('#resetBtn').onclick=async()=>{
 const email=$('#email').value.trim();
 if(!email){$('#loginMsg').textContent='Сначала введи email.';return}
 $('#loginMsg').textContent='Отправляем письмо…';
 const redirectTo=new URL('reset-password.html',location.href).href;
 const {error}=await db.auth.resetPasswordForEmail(email,{redirectTo});
 $('#loginMsg').textContent=error?'Ошибка: '+error.message:'Письмо отправлено. Используй самое новое письмо.';
};
(async()=>{const {data:{session}}=await db.auth.getSession();if(session)await show()})();