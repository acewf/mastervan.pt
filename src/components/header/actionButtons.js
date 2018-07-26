import { h, Component } from 'preact';

export const NewBudgetBt = ({action})=> (
  <button class="icon-plus" onClick={action}>
    Create Budget
  </button>
);

export const SaveBudgetBt = ({action})=> (
  <button class="icon-floppy" onClick={action}>
    Save Budget
  </button>
);