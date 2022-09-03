import { render, screen } from '@testing-library/react';
import Todo from './Todo'

const todo = {
  text: "a test",
  done: false
};

test('renders todo text', () => {
  render(
    <Todo todo={todo}/>
  );

  const text = screen.getByText('a test');
  expect(text).toBeInTheDocument();
});