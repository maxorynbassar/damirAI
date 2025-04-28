async function askGemini() {
  const prompt = document.getElementById("prompt").value;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBRmbpGTGiXeu4DHD93y0fWRxbwyE2_EPY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();

  if (data && data.candidates && data.candidates.length > 0) {
    const text = data.candidates[0].content.parts[0].text;

    try {
      const students = JSON.parse(text); // <- Пытаемся распарсить ответ как JSON
      showStudents(students); // <- Функция для вывода на экран
    } catch (error) {
      document.getElementById("output").innerText = "Ошибка парсинга JSON: " + error.message;
    }
  } else {
    document.getElementById("output").innerText = "Ошибка или пустой ответ.";
  }
}

document.getElementById("submit").addEventListener("click", askGemini);


function showStudents(students) {
  const tbody = document.querySelector("table tbody"); // Ищем таблицу
  tbody.innerHTML = ""; // Очищаем старые строки таблицы

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${student.name}</td>
      <td>${student.attendance[0] ? '✔️' : '❌'}</td>
      <td>${student.attendance[1] ? '✔️' : '❌'}</td>
      <td>${student.attendance[2] ? '✔️' : '❌'}</td>
      <td>${student.attendance[3] ? '✔️' : '❌'}</td>
      <td>${student.attendance[4] ? '✔️' : '❌'}</td>
    `;

    tbody.appendChild(row);
  });
}
