import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsWarehouseRefService } from './organizations-warehouse-ref.service';
import { OrganizationRepository } from './organizations.repository';

describe('OrganizationsWarehouseRefService', () => {
	let service: OrganizationsWarehouseRefService;

	const mockOrganizationRepository = new MockOrganizationsRepository();

	const updateByIdSpy = jest.spyOn(mockOrganizationRepository, 'findOneByIdAndUpdate');
	const updateSpy = jest.spyOn(mockOrganizationRepository, 'findOneAndUpdate');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsWarehouseRefService,
				{
					provide: OrganizationRepository,
					useValue: mockOrganizationRepository,
				},
			],
		}).compile();

		service = module.get<OrganizationsWarehouseRefService>(OrganizationsWarehouseRefService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should add ref', async () => {
		const orgId = new Types.ObjectId();
		const warehouseId = new Types.ObjectId();

		await service.addRef(orgId, {
			id: warehouseId,
			name: 'warehouse',
		});

		expect(updateByIdSpy).toBeCalledWith(orgId, {
			$push: expect.anything(),
		});
	});

	it('should update ref', async () => {
		const orgId = new Types.ObjectId();
		const warehouseId = new Types.ObjectId();

		await service.updateRef(orgId, {
			id: warehouseId,
			name: 'warehouse',
		});

		expect(updateSpy).toBeCalledWith(
			expect.objectContaining({
				_id: orgId,
			}),
			{
				$set: expect.anything(),
			},
		);
	});

	it('should update ref', async () => {
		const orgId = new Types.ObjectId();
		const warehouseId = new Types.ObjectId();

		await service.deleteRef(orgId, warehouseId);

		expect(updateByIdSpy).toBeCalledWith(orgId, {
			$pull: expect.anything(),
		});
	});
});
