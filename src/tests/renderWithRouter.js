// Para esse arquivo (renderWithRouter.js) foi consultado a aula ao vivo 14.3 e o conteúdo da aula 14.3 no curso da Trybe // Ademais a documentação no React Router (https://v5.reactrouter.com/web/api/history) e GitHub (https://github.com/remix-run/history/blob/dev/docs/api-reference.md#creatememoryhistory)
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

export default function renderWithRouter(component) {
  const history = createMemoryHistory();

  return {
    history,
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
  };
}
