import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsService } from './assignments.service';

describe('AssignmentsService', () => {
  let service: AssignmentsService;

  const mockAssignmentModel = {
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AssignmentsService,
        {
          provide: 'AssignmentModel',
          useValue: mockAssignmentModel,
        },
      ],
    }).compile();

    service = module.get(AssignmentsService);
  });

  it('should create assignment', async () => {
    const dto = { userId: 1, shiftId: 1 };
    await service.create(dto as any);
    expect(mockAssignmentModel.create).toHaveBeenCalled();
  });
});
