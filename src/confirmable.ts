export function confirmable(callback: (onConfirm: () => any) => any) {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        callback(() => {
            descriptor.value.call(arguments);
        });
    }
}