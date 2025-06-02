chart-analytics.js

const students = [
    'Жапаров Дамир', 'Нурболатов Нуртас', 'Майрашов Адайбек', 'Касымов Айбек', 'Ерланова Динара',
    'Турсынов Руслан', 'Сагынбекова Алия', 'Байжанов Ермек', 'Мухамеджанова Айсулу', 'Кайратов Марат',
    'Серикова Назгуль', 'Аманжолов Тимур', 'Жумадилов Нурсултан', 'Курманов Айдар', 'Есенгельдиева Гульмира'
  ];
  
  const attendanceData = [
    [1,1,0,1,0], [1,0,1,0,1], [0,1,1,1,1], [1,1,1,0,1], [1,0,1,1,1],
    [0,1,1,0,1], [1,1,0,1,1], [1,0,1,1,0], [1,1,1,1,1], [0,1,1,0,1],
    [1,1,1,1,0], [1,0,1,1,1], [1,1,0,1,1], [0,1,1,1,1], [1,0,1,1,0]
  ];
  
  const gradesData = [
    [70,100,50,70,100], [50,70,70,100,50], [100,100,70,70,70], [80,90,85,70,95], [75,60,80,90,85],
    [65,70,60,55,75], [90,85,60,70,80], [50,60,70,75,65], [100,95,90,85,100], [55,70,65,60,70],
    [80,85,90,95,60], [70,60,75,80,90], [85,90,55,70,85], [60,75,80,85,90], [95,65,70,75,60]
  ];
  
  // Расчёт процентов
  const attendancePercent = attendanceData.map(days => {
    const present = days.reduce((sum, d) => sum + d, 0);
    return Math.round(present / days.length * 100);
  });
  const gradesAverage = gradesData.map(grades => {
    const total = grades.reduce((sum, g) => sum + g, 0);
    return Math.round(total / grades.length);
  });
  
  function renderCharts() {
    // График посещаемости
    new Chart(document.getElementById('attendanceChart'), {
      type: 'bar',
      data: {
        labels: students,
        datasets: [{
          label: 'Посещаемость (%)',
          data: attendancePercent,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: value => value + '%'
            }
          }
        }
      }
    });
  
    // График оценок
    new Chart(document.getElementById('gradesChart'), {
      type: 'bar',
      data: {
        labels: students,
        datasets: [{
          label: 'Средний балл (%)',
          data: gradesAverage,
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: value => value + '%'
            }
          }
        }
      }
    });
  }
  
  // Вызываем рендер после загрузки страницы
  window.addEventListener('DOMContentLoaded', renderCharts);