export function required() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let value: any;

        const getter = function() {
            return value;
        };

        const setter = function(newVal: any) {
            if (newVal == null) throw new Error(`${propertyKey} cannot be null`);

            if (typeof(newVal) === "string" && newVal.length === 0) throw new Error(`${propertyKey} cannot be empty`);;

            value = newVal;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}