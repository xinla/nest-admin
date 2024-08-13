import { PartialType } from '@nestjs/mapped-types';
import { CreateCommonDto } from './create-common.dto';

export class UpdateCommonDto extends PartialType(CreateCommonDto) {}
