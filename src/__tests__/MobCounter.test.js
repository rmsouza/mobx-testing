import React from 'react';
import {
  render,
  fireEvent,
  cleanup
} from '@testing-library/react';
import 'jest-dom/extend-expect';
import MobCounter from '../components/MobCounter';
import { Provider } from 'mobx-react';
import { decorate, observable, action} from 'mobx';

afterEach(cleanup);

class CounterStorage {
  count = 0;

  increment = () => {
    this.count++;
  }

  decrement = () => {
    this.count--;
  }
};
const DecoratedStore = decorate(CounterStorage, {
  count: observable,
  increment: action,
  decrement: action
});

const renderWithStore = (counterStore) => {
  return render (
    <Provider CounterStore={counterStore}>
      <MobCounter />
    </Provider>
  );
};

it('should have two buttons', () => {
  const counterStore = new DecoratedStore();
  const { getByTestId } = renderWithStore(counterStore);

  expect(getByTestId('btn-increment')).toBeInTheDocument();
  expect(getByTestId('btn-decrement')).toBeInTheDocument();
});

it('should increment count', () => {
  const counterStore = new DecoratedStore();
  const { getByTestId, getByText } = renderWithStore(counterStore);

  expect(getByTestId('text-count')).toHaveTextContent('0');

  fireEvent.click(getByText('+'));

  expect(getByTestId('text-count')).toHaveTextContent('1');
});

it('should decrement count', () => {
  const counterStore = new DecoratedStore();
  const { getByTestId, getByText } = renderWithStore(counterStore);

  fireEvent.click(getByText('-'));

  expect(getByTestId('text-count')).toHaveTextContent('-1');
});