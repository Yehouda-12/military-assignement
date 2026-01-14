import { Test } from '@nestjs/testing';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';

describe('AssignmentsController', () => {
  let controller: AssignmentsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AssignmentsController],
      providers: [
        {
          provide: AssignmentsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get(AssignmentsController);
  });

  it('should return all assignments', async () => {
    expect(await controller.findAll()).toEqual([]);
  });
});
