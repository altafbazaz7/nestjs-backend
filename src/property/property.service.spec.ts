import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { getModelToken } from '@nestjs/mongoose';
import { Property } from './schema/property.schema';
import { NotFoundException } from '@nestjs/common';

describe('PropertyService', () => {
  let service: PropertyService;
  let mockPropertyModel: any;

  beforeEach(async () => {
    mockPropertyModel = {
      create: jest.fn(),
      find: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: getModelToken(Property.name),
          useValue: mockPropertyModel,
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a property', async () => {
      const dto = { title: 'Test Property', description: 'Test Description', price: 100000 , location: 'Test Location' };
      const result = { _id: '123', ...dto };
      mockPropertyModel.create.mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(mockPropertyModel.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of properties', async () => {
      const result = [{ _id: '1' }, { _id: '2' }];
      mockPropertyModel.exec.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(mockPropertyModel.find).toHaveBeenCalled();
      expect(mockPropertyModel.exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a property if found', async () => {
      const result = { _id: '123' };
      mockPropertyModel.findById.mockResolvedValue(result);

      expect(await service.findOne('123')).toEqual(result);
      expect(mockPropertyModel.findById).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundException if not found', async () => {
      mockPropertyModel.findById.mockResolvedValue(null);

      await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return updated property if found', async () => {
      const result = { _id: '123', name: 'Updated' };
      mockPropertyModel.findByIdAndUpdate.mockResolvedValue(result);

      expect(await service.update('123', { name: 'Updated' })).toEqual(result);
      expect(mockPropertyModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '123',
        { name: 'Updated' },
        { new: true },
      );
    });

    it('should throw NotFoundException if not found', async () => {
      mockPropertyModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        service.update('123', { name: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should return deleted property if found', async () => {
      const result = { _id: '123' };
      mockPropertyModel.findByIdAndDelete.mockResolvedValue(result);

      expect(await service.remove('123')).toEqual(result);
      expect(mockPropertyModel.findByIdAndDelete).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundException if not found', async () => {
      mockPropertyModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove('123')).rejects.toThrow(NotFoundException);
    });
  });
});
