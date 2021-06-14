"use strict";

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
const fahrenheit = 94;
const pounds = 300;
const defaultName = "Bob";
const phrasesRandom = [
    ["Willy the Goblin", "Big Daddy", "Father Christmas"],
    ["the soup kitchen", "Disneyland", "the White house"],
    ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"]];

randomize.addEventListener('click', result);

function result() {
    let name = defaultName;
    if (customName.value !== '') {
        name = customName.value;
    } 

    let weight = pounds + " pounds";
    let temperature = fahrenheit + " fahrenheit";
    if (document.getElementById("uk").checked) {
        weight = poundsToStone(pounds) + " stones";
        temperature = fahrenheitToCentigrade(fahrenheit) + " centigrade";
    }

    story.textContent = generateRandomStory(name, weight, temperature);
    story.style.visibility = 'visible';
}

function generateRandomStory(name, weight, temperature) {
    let character = randomValueFromArray(phrasesRandom[0]);
    let place = randomValueFromArray(phrasesRandom[1]);
    let storyEvent = randomValueFromArray(phrasesRandom[2]);
    let story = `It was ${temperature} outside, so ${character} went for a walk. When they got to ${place}, they stared in horror for a few moments, then ${storyEvent}. ${name} saw the whole thing, but was not surprised — ${character} weighs ${weight}, and it was a hot day.`
    return story;
}


function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function poundsToStone(pounds) {
    return Math.round(pounds * 0.0714286);
}

function fahrenheitToCentigrade(fahrenheit) {
    return Math.round((fahrenheit - 32) * (5/9));
}