let erroMessage1 = document.querySelector('span.erro1');
let erroMessage2 = document.querySelector('span.erro2');
let erroMessage3 = document.querySelector('span.erro3');

let button = document.getElementById('seta-imagem');

button.addEventListener('click', submitUsersInfos);

function submitUsersInfos() {
  let dayUser = document.getElementById('dayUser');
  let dayUserValue = Number(dayUser.value);

  let monthUser = document.getElementById('monthUser');
  let monthUserValue = Number(monthUser.value);

  let yearUser = document.getElementById('yearUser');
  let yearUserValue = Number(yearUser.value);

  if (dayUserValue > 31 || dayUserValue <= 0 || dayUserValue === '') {
    dayUser.style.borderColor = 'red';
    erroMessage1.style.display = 'block';
  } else if (monthUserValue > 12 || monthUserValue <= 0 || monthUserValue === '') {
    monthUser.style.borderColor = 'red';
    erroMessage2.style.display = 'block';
  } else if (yearUserValue > 2023 || yearUserValue <= 0 || yearUserValue === '') {
    yearUser.style.borderColor = 'red';
    erroMessage3.style.display = 'block';
  } else {
    let birthDate = `${yearUserValue}-${monthUserValue}-${dayUserValue}`;

    let age = calculateAge(birthDate);

    let resYears = document.querySelector('span#res-years')
    let resMonths = document.querySelector('span#res-months')
    let resDays = document.querySelector('span#res-days')

    resYears.innerText = age.years
    resMonths.innerText = age.months
    resDays.innerText = age.days
    
    console.log('Idade:', age.years, 'anos,', age.months, 'meses e', age.days, 'dias');
  }
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
  
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
  
    // Verifica se o aniversário já ocorreu neste mês
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }
  
    // Ajusta os dias para considerar a diferença no número de dias entre os meses
    const birthCopy = new Date(birth.getTime());
    birthCopy.setFullYear(today.getFullYear());
  
    const diff = today - birthCopy;
    const diffDate = new Date(diff);
    const totalDays = diffDate.getDate() - 1;
  
    days = (totalDays < 0) ? totalDays + getLastDayOfPreviousMonth(today) : totalDays;
  
    return {
      years: years,
      months: months,
      days: days
    };
  }
  
  function getLastDayOfPreviousMonth(date) {
    const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0).getDate();
  }
  
  