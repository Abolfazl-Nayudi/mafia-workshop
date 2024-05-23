import { createElement, selectedElement } from '../../utils/domUtils.js';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/storageUtils.js';

const gameRoles = selectedElement('.game-roles');
const nextBtn = selectedElement('.next-btn');
// collect playerData in local storage
const playersData = [];
if (getFromLocalStorage('players')) {
  playersData.push(...getFromLocalStorage('players'));
}

const allRoles = {
  citizen: [
    'Doctor',
    'Detective',
    'Sniper',
    'Rifleman',
    'Roeen tan',
    'Rad gir',
    'Anti Lady',
    'Judge',
    'Bartender',
    'Gambler',
    'Viewer',
    'Cowboy',
    'Mason',
    'Tyler',
    'Priest',
    'Bodyguard',
    'Citizen',
    'Citizen',
    'Citizen',
    'Citizen',
  ],
  mafia: [
    'Godfather',
    'Dr. Lecter',
    'Terrorist',
    'Vandal',
    'Spy',
    'Lawyer',
    'Lady Voodoo',
    'Ninja',
    'Natasha',
    'Mafia',
    'Mafia',
  ],
  additional: ['Killer', 'Joker'],
};

allRoles.citizen.forEach((role) => {
  const roleBtn = createElement('button', role, [
    'btn',
    'm-1',
    'btn-outline-light',
  ]);
  roleBtn.addEventListener('click', handleBtnRole);
  gameRoles.append(roleBtn);
});
allRoles.mafia.forEach((role) => {
  const roleBtn = createElement('button', role, [
    'btn',
    'm-1',
    'btn-outline-danger',
  ]);

  roleBtn.addEventListener('click', handleBtnRole);
  gameRoles.append(roleBtn);
});
allRoles.additional.forEach((role) => {
  const roleBtn = createElement('button', role, [
    'btn',
    'm-1',
    'btn-outline-warning',
  ]);
  roleBtn.addEventListener('click', handleBtnRole);
  gameRoles.append(roleBtn);
});

const selectedRoles = getFromLocalStorage('roles') || [];

function handleBtnRole(e) {
  if (
    selectedRoles.length < playersData.length ||
    e.target.classList.contains('btn-success')
  ) {
    if (!e.target.classList.contains('btn-success')) {
      selectedRoles.push(e.target.textContent);
      e.target.classList.add('btn-success');
    } else if (e.target.classList.contains('btn-success')) {
      selectedRoles.forEach((role, index) => {
        if (role === e.target.textContent) {
          selectedRoles.splice(index, 1);
          e.target.classList.remove('btn-success');
        }
      });
    }

    saveToLocalStorage('roles', selectedRoles);

    if (selectedRoles.length === playersData.length) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  } else {
    alert('you have reached the maximum number of role selections');
  }

  console.log(selectedRoles);
}

nextBtn.addEventListener('click', () => {
  window.location.href = '../../pages/2-game.html';
});
