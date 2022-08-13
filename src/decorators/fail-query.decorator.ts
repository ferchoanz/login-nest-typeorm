import { BadRequestException } from "@nestjs/common";

export function FailQuery(name?: string): MethodDecorator {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const { value } = descriptor;
        descriptor.value = async function () {
            return await value.call(this, arguments[0]).catch((error: any) => { throw new BadRequestException (error.driverError.detail) });
        }
    }
}