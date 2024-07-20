import { PartialType } from '@nestjs/mapped-types';
import { CreateDeptDto } from './create-dept.dto';

export class UpdateDeptDto extends PartialType(CreateDeptDto) {}
