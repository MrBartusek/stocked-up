import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
	let service: OrganizationsService;

	const mockOrganizationRepository = new MockOrganizationsRepository();

	const mockEventEmitter = {
		emit: jest.fn(),
	};

	const emitSpy = jest.spyOn(mockEventEmitter, 'emit');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsService,
				{
					provide: EventEmitter2,
					useValue: mockEventEmitter,
				},
				{
					provide: OrganizationRepository,
					useValue: mockOrganizationRepository,
				},
			],
		}).compile();

		service = module.get<OrganizationsService>(OrganizationsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create organization', async () => {
		const org = await service.create({ name: 'test-name' } as any);

		expect(org.name).toBe('test-name');
	});

	it('should update organization', async () => {
		const org = await service.update(new Types.ObjectId(), { name: 'updated-name' } as any);

		expect(org.name).toBe('updated-name');
		expect(emitSpy).toHaveBeenCalledWith('organization.updated', expect.anything());
	});

	it('should delete organization', async () => {
		const org = await service.delete(new Types.ObjectId());

		expect(org.name).toBe('test-name');
		expect(emitSpy).toHaveBeenCalledWith('organization.deleted', expect.anything());
	});

	it('should find by id', async () => {
		const org = await service.findById(new Types.ObjectId());
		expect(org.name).toBe('test-name');
	});

	it('should check if org exist', async () => {
		const exist = await service.exist(new Types.ObjectId());
		expect(exist).toBe(true);
	});

	it('should check if name is taken', async () => {
		const taken = await service.nameTaken('taken');
		expect(taken).toBe(true);
	});
});
