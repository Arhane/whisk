import { combineLatest, fromEvent, map, Subject, zip } from "rxjs";
import { ChangeEvent } from "react";
import { positiveInteger } from "./positiveInteger";
import { fold } from "fp-ts/Either";
import { fibonacci } from "./fibonacci";

const button = document.getElementById('submit') as HTMLButtonElement;
const stateContainer = document.getElementById('state') as HTMLDivElement
const input = document.getElementById('input') as HTMLInputElement;
const state = new Subject<string>()

const onError = (): string => {
  button.setAttribute('disabled', 'true');
  return 'Непохоже, что вы ввели число'
}
const onSuccess = (item: number): string => {
  button.removeAttribute('disabled');
  return fibonacci(item).toString();
}

const buttonClick = fromEvent(button, 'click');
const inputChange = fromEvent<ChangeEvent>(input, 'change' )
  .pipe(
    map(event => (event?.target as HTMLInputElement)?.value),
    map(value => positiveInteger.decode(value)),
    map(fold(onError, onSuccess)),
  )

combineLatest([inputChange, buttonClick]).subscribe(item => {
  state.next(item[0])
});

state.subscribe(item => {
  stateContainer.textContent = item;
})

