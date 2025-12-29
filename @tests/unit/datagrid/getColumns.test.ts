import { describe, expect, it } from '@jest/globals';
import { GridColDef } from '@mui/x-data-grid';
import getColumns from '@/components/v2/ModuleDataGrid/controller/utils/getColumns';
import datagrid from '@/types/v2/datagrid/datagrid';

describe('getColumns', () => {
  type TestColumn = GridColDef & { id: string; size: number; headerName: string };

  const columnA: TestColumn = {
    field: 'id',
    headerName: 'ID',
    id: 'id',
    size: 12,
  };

  const columnB: TestColumn = {
    field: 'name',
    headerName: 'Nombre',
    id: 'name',
    size: 6,
  };

  const columnC: TestColumn = {
    field: 'email',
    headerName: 'Email',
    id: 'email',
    size: 6,
  };

  it('retorna el mismo arreglo cuando columns es un array', () => {
    const columnsArray: datagrid['columns'] = [columnA, columnB];

    const result = getColumns(columnsArray);

    expect(result).toEqual(columnsArray);
    expect(result.every((column) => typeof column.field === 'string')).toBe(true);
  });

  it('aplana los steps y devuelve siempre un GridColDef[] cuando columns es un stepper', () => {
    const stepperColumns: datagrid['columns'] = {
      title: 'Stepper de prueba',
      orientation: 'horizontal',
      steps: [
        {
          title: 'Paso 1',
          description: 'Primer paso',
          config: {},
          fields: [columnA],
        },
        {
          title: 'Paso 2',
          description: 'Segundo paso',
          config: {},
          fields: [columnB, columnC],
        },
      ],
    };

    const result = getColumns(stepperColumns);

    expect(result).toEqual([columnA, columnB, columnC]);
    expect(result.every((column) => typeof column.field === 'string')).toBe(true);
  });
});

