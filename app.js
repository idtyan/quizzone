const quizzes=[
 {id:"marvel",icon:"🦸",title:"Какой ты герой Marvel?",desc:"10 вопросов и один персонаж, который тебе подходит.",meta:"10 вопросов · 2 мин"},
 {id:"kazakhstan",icon:"🇰🇿",title:"Насколько хорошо ты знаешь Казахстан?",desc:"Проверь знания о городах, культуре и интересных фактах.",meta:"10 вопросов · 3 мин"},
 {id:"movie",icon:"🎬",title:"Угадай фильм по подсказкам",desc:"Сможешь определить фильм по коротким подсказкам?",meta:"10 вопросов · 2 мин"},
 {id:"music",icon:"🎵",title:"Какая ты музыкальная эпоха?",desc:"Ответь на вопросы и узнай, какая эпоха тебе ближе.",meta:"8 вопросов · 2 мин"},
 {id:"gamer",icon:"🎮",title:"Какой ты тип игрока?",desc:"Кто ты: исследователь, соревнователь или стратег?",meta:"8 вопросов · 2 мин"},
 {id:"logic",icon:"🧠",title:"Мини-тест на логику",desc:"Несколько коротких задач на внимательность и логику.",meta:"10 вопросов · 3 мин"}
];
const grid=document.querySelector("#quiz-grid");
if(grid) grid.innerHTML=quizzes.map(q=>`<a class="quiz-card" href="quiz.html?id=${q.id}"><div class="quiz-icon">${q.icon}</div><h3>${q.title}</h3><p>${q.desc}</p><span class="meta">${q.meta}</span></a>`).join("");
