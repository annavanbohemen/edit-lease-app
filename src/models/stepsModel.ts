export interface Step {
    key: string;
    label: string;
    isDone: boolean;
    component: () => JSX.Element
}