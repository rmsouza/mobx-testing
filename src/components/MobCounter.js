import React from 'react';
import { inject, observer } from 'mobx-react';

const MobCounter = ({ CounterStore }) => {

  return (
    <>
      <button data-testid='btn-increment' onClick={CounterStore.decrement}>-</button>
      <button data-testid='btn-decrement' onClick={CounterStore.increment}>+</button>

      <h1 data-testid='text-count'>{CounterStore.count}</h1>
    </>
  );
}

export default inject('CounterStore')(observer(MobCounter));