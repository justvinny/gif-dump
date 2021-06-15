'use strict';

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i = 1; i <= 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic' + i + '.jpg');
    newImage.addEventListener('click', () => displayedImage.setAttribute('src', newImage.src));
    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
const darkenBtn = document.querySelector('.dark');
const displayedImg = document.querySelector('.displayed-img');
darkenBtn.addEventListener('click', () => toggleDisplayedImg(overlay, darkenBtn));

function toggleDisplayedImg(overlay, darkenBtn) {
    const darkenBtnText = darkenBtn.textContent;
    if (darkenBtnText === 'Darken') {
        darkenBtn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
    } else {
        darkenBtn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}