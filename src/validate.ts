export interface IValidator {
    validate<T>(value: T): boolean;
}

export function validate<T>(validator: (value: T) => boolean): Function;
export function validate<T>(validator: IValidator): Function
export function validate<T>(validator: (IValidator | ((value: T) => boolean))): Function {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
        let value: any;

        const getter = function() {
            return value;
        };

        const setter = function(newVal: T) {
            if (typeof(validator) === "function" && validator(newVal) !== true) return;
            else if ((validator as IValidator)?.validate?.(newVal) !== true) return; 

            value = newVal;
        }; 

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}