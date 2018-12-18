import { ReactTestInstance } from "react-test-renderer";

import {
  getAllByLabelText,
  getByLabelText,
  queryAllByLabelText,
  queryByLabelText,
} from "./byLabelText";
import {
  getAllByTestID,
  getByTestID,
  queryAllByTestID,
  queryByTestID,
} from "./byTestID";
import { getAllByText, getByText, queryAllByText, queryByText } from "./byText";
import toJSON from "./toJSON";

type Func0<R> = () => R;
type Func1<A, R> = (a?: A) => R;
type Func2<A, B, R> = (a: A, b?: B) => R;
type Func3<A, B, C, R> = (a: A, b: B, c?: C) => R;

type RemoveFirstArgument<T, R> =
    T extends [any, any, any, any?] ? Func3<T[1], T[2], T[3], R> :
    T extends [any, any, any?] ? Func2<T[1], T[2], R> :
    T extends [any, any?] ? Func1<T[1], R> :
    T extends [any] ? Func0<R> :
    unknown
;

// tslint:disable
// @TODO: currently tslint fails to parse this: `...any[]`.
function applyContainer<T extends [ReactTestInstance, ...any[]], R>(container: ReactTestInstance, fn: (...args: T) => R): RemoveFirstArgument<T, R> {
  return ((...args: any[]) => fn(...[container, ...args] as any)) as any;
}
// tslint:enable

export default function within(container: ReactTestInstance) {
  return {
    getByTestID: applyContainer(container, getByTestID),
    getAllByTestID: applyContainer(container, getAllByTestID),
    queryByTestID: applyContainer(container, queryByTestID),
    queryAllByTestID: applyContainer(container, queryAllByTestID),
    getByText: applyContainer(container, getByText),
    getAllByText: applyContainer(container, getAllByText),
    queryByText: applyContainer(container, queryByText),
    queryAllByText: applyContainer(container, queryAllByText),
    getByLabelText: applyContainer(container, getByLabelText),
    getAllByLabelText: applyContainer(container, getAllByLabelText),
    queryByLabelText: applyContainer(container, queryByLabelText),
    queryAllByLabelText: applyContainer(container, queryAllByLabelText),
    toJSON: () => toJSON(container),
  }
}