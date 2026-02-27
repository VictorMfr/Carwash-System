import { z } from 'zod'
 
// Login Schema
export const LoginSchema = z.object({
  email: 
  z.string()
  .min(1, 'El email es requerido')
  .email('El email no es válido'),

  password: 
  z.string()
  .min(1, 'La contraseña es requerida')
});

// USER SCHEMA  

// User create schema
export const UserObjectCreateSchema = z.object({
  name: z.string('El nombre es requerido').min(1, 'El nombre es requerido'),
  lastname: z.string('El apellido es requerido').min(1, 'El apellido es requerido'),
  phone: z.string('El teléfono es requerido').min(1, 'El teléfono es requerido'),
  address: z.string('La dirección es requerida').min(1, 'La dirección es requerida'),
  email: z.string('El email es requerido').email('El email no es válido').min(1, 'El email es requerido'),
  password: z.string('La contraseña es requerida').min(1, 'La contraseña es requerida'),
  role: z.string('El rol es requerido').min(1, 'El rol es requerido')
});

// User update schema (password no requerido)
export const UserObjectUpdateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  email: z.string().min(1, 'El email es requerido').email('El email no es válido'),
  role: z.string().min(1, 'El rol es requerido')
});

// Assign roles schema
export const AssignRolesSchema = z.object({
  roles: z.array(z.union([z.string(), z.number()])).min(1, 'Debe seleccionar al menos un rol')
});

// Role schema
export const RoleObjectSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida').optional(),
});





// STOCK SCHEMA

// Stock create schema
export const StockObjectSchema = z.object({
  product: z.object(undefined, 'Debe seleccionar un producto'),
  minimum_quantity: z.number('Debe seleccionar una cantidad mínima').positive('Debe ser positivo'),
});

export const StockObjectUpdateSchema = z.object({
  minimum_quantity: z.number('Debe seleccionar una cantidad mínima').positive('Debe ser positivo'),
});

// Product schema
export const ProductObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  unit: z.string().min(1, 'La unidad es requerida'),
  isTool: z.boolean().optional(),
});

export const BrandObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export const StatusObjectSchema = z.object({
  status: z.string().min(1, 'El estado es requerido'),
});



// FORM INPUTS SCHEMA
const FormInputSchema = z.object({
  field: z.string(),
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.record(z.string(), z.any()), // allow object values
    z.array(z.any()),              // allow arrays (e.g., operators multiple)
    z.null()
  ]),
  error: z.string().optional().default('')
});

const FormInputsArraySchema = z.array(FormInputSchema).transform(arr =>
  arr.reduce((acc, cur) => {
    acc[cur.field] = cur.value;
    return acc;
  }, {} as Record<string, string | number | boolean | Record<string, any> | any[] | null>)
);


// FINANCE SCHEMA
export const FinanceObjectSchema = z.object({
  date: z.string().min(1, 'La fecha es requerida'),
  amount: z.number('El monto es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  auto: z.boolean().optional(),
  dollar_rate: z.number('La tasa de dólar es requerida').positive('La tasa de dólar debe ser positiva'),
  account: z.object(undefined, 'Debe seleccionar una cuenta'),
  method: z.object(undefined, 'Debe seleccionar un método'),
});

export const AccountObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
});

export const MethodObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

// SERVICE SCHEMA

export const RecipeObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export const VechileBrandObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export const ServiceVehicleObjectSchemaStepOne = z.object({
  date: z.string().min(1, 'La fecha es requerida'),
  vehicleLicensePlate: z.object(undefined, 'La placa de vehículo es requerida'),
});

export const ModelObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export const ClientObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
});

export const OperatorObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
});

export const VehicleWithUserObjectSchema = z.object({
  license_plate: z.string().min(1, 'El número de placa es requerido'),
});

export const VehicleWithBrandModelClientObjectSchema = z.object({
  license_plate: z.string().min(1, 'El número de placa es requerido'),
  vehicle_brand: z.object(undefined, 'La marca de vehículo es requerida'),
  vehicle_model: z.object(undefined, 'El modelo de vehículo es requerido'),
  client: z.object(undefined, 'El cliente es requerido'),
});

export const ServiceObjectSchema = z.object({
  date: z.string().min(1, 'La fecha es requerida'),
  // Autocomplete simple: aceptar objeto con { id } o { license_plate }
  vehicleLicensePlate: z.object({
    id: z.number().optional(),
    license_plate: z.string().min(1).optional(),
  }, 'El vehículo es requerido').refine(v => Boolean(v.id || v.license_plate), { message: 'El vehículo es requerido' }),

  // Autocomplete simple: aceptar objeto con { id } o { name }
  recipeName: z.object({
    id: z.number().optional(),
    name: z.string().min(1).optional(),
  }, 'La receta es requerida').refine(r => Boolean(r.id || r.name), { message: 'La receta es requerida' }),

  // Autocomplete multiple: array de objetos con { id } o { name }
  operators: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().optional(),
      lastname: z.string().optional(),
    }).refine(o => Boolean(o.id || o.name), { message: 'Operador inválido' })
  ).min(1, 'Los operadores son requeridos'),
});

export const ServiceVehicleObjectSchemaStepTwo = z.object({
  recipeName: z.object(undefined, 'La receta es requerida'),
  operators: z.array(z.object(), 'Los operadores son requeridos').min(1, 'Los operadores son requeridos'),
});

export const ServiceVehicleObjectSchemaStepThree = z.object({
  extras: z.array(z.object(), 'Los extras son requeridos').min(1, 'Los extras son requeridos'),
});

export const ServiceVehicleObjectSchemaStepFour = z.object({
  dollar_charge: z.number('El cobro en dolares es requerido').optional(),
  bol_charge: z.number('El cobro en bolívares es requerido').optional(),
  dollar_rate: z.number('La tasa de cambio es requerida'),
});

// STATE SCHEMA
export const StateObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

// MARKETING SCHEMA

export const FeedbackObjectSchema = z.object({
  client: z.object({
    id: z.number(),
  }, 'El cliente es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  opinionType: z.string().min(1, 'El tipo de opinión es requerido'),
});


const AutocompleteObjectSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  name: z.string().optional(),
  label: z.string().optional(),
  value: z.union([z.string(), z.number()]).optional(),
}).partial();

export const StockDetailsObjectSchema = z.object({
  quantity: z.number('La cantidad es requerida'),
  entry_date: z.date({ message: 'La fecha es requerida' }),
  picture: z.string().min(1, 'La imagen es requerida'),
  brand: AutocompleteObjectSchema.refine(
    (v) => Boolean(v?.id || v?.value || v?.name),
    { message: 'La marca es requerida' }
  ),
  state: AutocompleteObjectSchema.refine(
    (v) => Boolean(v?.id || v?.value || v?.name),
    { message: 'El estado es requerido' }
  ),
  dollar_rate: z.number().optional(),
  bol_charge: z.number().optional(),
  dollar_charge: z.number().optional(),
  charge_account: AutocompleteObjectSchema.optional(),
  method: AutocompleteObjectSchema.optional(),
});

export const FailureObjectSchema = z.object({
  // Autocomplete simple: aceptar objeto con id
  stockDetail: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
  }, 'Debe seleccionar un producto').refine(v => Boolean(v.id), { message: 'Debe seleccionar un producto' }),

  description: z.string().min(1, 'La descripción es requerida'),
  resolved: z.boolean().optional(),
});

// EXPORT SCHEMAS
export const BrandSchema = FormInputsArraySchema.pipe(BrandObjectSchema);
export const UserCreateSchema = FormInputsArraySchema.pipe(UserObjectCreateSchema);
export const UserUpdateSchema = FormInputsArraySchema.pipe(UserObjectUpdateSchema);
export const StockSchema = FormInputsArraySchema.pipe(StockObjectSchema);
export const ProductSchema = FormInputsArraySchema.pipe(ProductObjectSchema);
export const OperatorSchema = FormInputsArraySchema.pipe(OperatorObjectSchema);
export const AccountSchema = FormInputsArraySchema.pipe(AccountObjectSchema);
export const MethodSchema = FormInputsArraySchema.pipe(MethodObjectSchema);
export const FinanceSchema = FormInputsArraySchema.pipe(FinanceObjectSchema);
export const ServiceSchema = FormInputsArraySchema.pipe(ServiceObjectSchema);
export const VehicleWithUserSchema = FormInputsArraySchema.pipe(VehicleWithUserObjectSchema);
export const ClientSchema = FormInputsArraySchema.pipe(ClientObjectSchema);
export const ModelSchema = FormInputsArraySchema.pipe(ModelObjectSchema);
export const ServiceVehicleSchemaStepOne = FormInputsArraySchema.pipe(ServiceVehicleObjectSchemaStepOne);
export const VehicleWithBrandModelClientSchema = FormInputsArraySchema.pipe(VehicleWithBrandModelClientObjectSchema);
export const VechileBrandSchema = FormInputsArraySchema.pipe(VechileBrandObjectSchema);
export const ServiceVehicleSchemaStepTwo = FormInputsArraySchema.pipe(ServiceVehicleObjectSchemaStepTwo);
export const ServiceVehicleSchemaStepThree = FormInputsArraySchema.pipe(ServiceVehicleObjectSchemaStepThree);
export const ServiceVehicleSchemaStepFour = FormInputsArraySchema.pipe(ServiceVehicleObjectSchemaStepFour);
export const RecipeSchema = FormInputsArraySchema.pipe(RecipeObjectSchema);
export const FailureSchema = FormInputsArraySchema.pipe(FailureObjectSchema);
export const FeedbackSchema = FormInputsArraySchema.pipe(FeedbackObjectSchema);