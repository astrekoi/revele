import React from 'react';
import leopard from '../pictures/leopard-leopard-vzglyad-bapz.jpg';
import tiger from '../pictures/tiger-tigr-vzglyad-kquy.jpg';
import duck from '../pictures/1674523453_animeshka-org-p-cherry-valley-duck-breed-vkontakte-71.jpg';
import '../styles/pages-style/Homework1.css';

const Test = () => {
  return (
    <div className="test-container">
      <h1>Привет, мир!</h1>
      <p>Это простой пример кода на React с использованием JSX.</p>
      <ul>
        <li>Элемент списка 1</li>
        <li>Элемент списка 2</li>
        <li>Элемент списка 3</li>
      </ul>
      <form className="form">
        <label htmlFor="name">Имя:</label>
        <input type="text" id="name" />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
        <br />
        <label htmlFor="gender">Пол:</label>
        <select id="gender">
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        <br />
        <button type="submit">Отправить</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Заголовок 1</th>
            <th>Заголовок 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ячейка 1</td>
            <td>Ячейка 2</td>
          </tr>
          <tr>
            <td>Ячейка 3</td>
            <td>Ячейка 4</td>
          </tr>
        </tbody>
      </table>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/7oHnev-KjwY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <picture>
        <source media="(min-width: 850px)" srcSet={leopard} />
        <source media="(min-width: 665px)" srcSet={tiger} />
        <img src={duck} alt="Duck" style={{ width: 'auto' }} />
      </picture>

      <a href="<URL>" target="_blank" rel="noreferrer">
        Посетите мой сайт
      </a>

      <meta name="description" content="<Описание вашего сайта>" />

      <meta name="keywords" content="<Ключевые слова для вашего сайта>" />

      <meta httpEquiv="Content-Type" content="<Кодировка вашего сайта>" />
    </div>
  );
};

export default Test;