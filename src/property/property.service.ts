import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './schema/property.schema';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  async create(dto: CreatePropertyDto) {
    return await this.propertyModel.create(dto);
  }

  async findAll() {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string) {
    const property = await this.propertyModel.findById(id);
    if (!property) throw new NotFoundException('Property not found');
    return property;
  }

  async update(id: string, updateData: any) {
    const updated = await this.propertyModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Property not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.propertyModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Property not found');
    return deleted;
  }
}
