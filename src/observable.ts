export interface IObservable {
    subscribe: (subscriber: ISubscriber) => any;
    notify: (target: IObservable, data: any) => any;
}


export interface ISubscriber {
    onChange: (propertyKey: string) => any;
}

export function observable() {
    return function(target: IObservable, propertyKey: string, descriptor: PropertyDescriptor) {
        let value: any;

        const getter = function() {
            return value;
        };

        const setter = function(newVal: any) {
            value = newVal;

            target.notify(target, propertyKey);
        }; 

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}