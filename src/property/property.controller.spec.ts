import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

describe('PropertyController', () => {
  let controller: PropertyController;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: PropertyService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto and return result', async () => {
      const dto: CreatePropertyDto = {
        title: 'Test Property',
        description: 'Test Description',
        price: 100000,
        location: 'Test Location',
      };
      const result = { _id: '1', ...dto };
      mockService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return array of properties', async () => {
      const result = [{ _id: '1' }, { _id: '2' }];
      mockService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a property by id', async () => {
      const result = { _id: '1' };
      mockService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update and return the property', async () => {
      const result = { _id: '1', name: 'Updated' };
      mockService.update.mockResolvedValue(result);

      expect(await controller.update('1', { name: 'Updated' })).toEqual(result);
      expect(mockService.update).toHaveBeenCalledWith('1', { name: 'Updated' });
    });
  });

  describe('remove', () => {
    it('should remove and return the property', async () => {
      const result = { _id: '1' };
      mockService.remove.mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(mockService.remove).toHaveBeenCalledWith('1');
    });
  });
});
