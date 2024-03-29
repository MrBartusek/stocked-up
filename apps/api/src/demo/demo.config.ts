export interface DemoAccountConfig {
	warehouses: string[];
	products: {
		name: string;
		description: string;
		buyPrice: number;
		sellPrice: number;
		sku: string;
		unit: string;
	}[];
}

// Most of this is ChatGPT
const DEMO_CONFIG: DemoAccountConfig = {
	warehouses: ['City Centre Store', 'Suburbs Store', 'Main Warehouse', 'Online Store Warehouse'],
	products: [
		{
			name: 'Oil Filter',
			description: 'High-quality oil filter for engine protection',
			buyPrice: 10.99,
			sellPrice: 15.99,
			sku: 'OF-001',
			unit: 'part',
		},
		{
			name: 'Alternator',
			description: 'Premium alternator for reliable power generation',
			buyPrice: 89.99,
			sellPrice: 129.99,
			sku: 'ALT-002',
			unit: 'piece',
		},
		{
			name: 'Spark Plug Set',
			description: 'Efficient spark plug set for optimal combustion',
			buyPrice: 7.49,
			sellPrice: 11.99,
			sku: 'SP-003',
			unit: 'set',
		},
		{
			name: 'Brake Pads',
			description: 'Durable brake pads for reliable stopping power',
			buyPrice: 25.99,
			sellPrice: 39.99,
			sku: 'BP-004',
			unit: 'set',
		},
		{
			name: 'Air Filter',
			description: 'High-performance air filter for improved engine efficiency',
			buyPrice: 12.99,
			sellPrice: 18.99,
			sku: 'AF-005',
			unit: 'part',
		},
		{
			name: 'Battery',
			description: 'Long-lasting battery for consistent power supply',
			buyPrice: 49.99,
			sellPrice: 69.99,
			sku: 'BAT-006',
			unit: 'piece',
		},
		{
			name: 'Transmission Fluid',
			description: 'Quality transmission fluid for smooth gear shifts',
			buyPrice: 8.99,
			sellPrice: 12.99,
			sku: 'TF-007',
			unit: 'bottle',
		},
		{
			name: 'Radiator Hose',
			description: 'Heat-resistant radiator hose for efficient cooling',
			buyPrice: 6.49,
			sellPrice: 9.99,
			sku: 'RH-008',
			unit: 'part',
		},
		{
			name: 'Headlight Bulbs',
			description: 'Bright headlight bulbs for enhanced visibility',
			buyPrice: 5.99,
			sellPrice: 8.99,
			sku: 'HB-009',
			unit: 'box',
		},
		{
			name: 'Fuel Pump',
			description: 'Reliable fuel pump for consistent fuel delivery',
			buyPrice: 34.99,
			sellPrice: 49.99,
			sku: 'FP-010',
			unit: 'piece',
		},
		{
			name: 'Steering Rack',
			description: 'Precision steering rack for responsive control',
			buyPrice: 79.99,
			sellPrice: 109.99,
			sku: 'SR-011',
			unit: 'part',
		},
		{
			name: 'Cabin Air Filter',
			description: 'Clean cabin air filter for fresh interior air',
			buyPrice: 11.49,
			sellPrice: 16.99,
			sku: 'CAF-012',
			unit: 'part',
		},
		{
			name: 'Wiper Blades',
			description: 'Durable wiper blades for clear visibility in any weather',
			buyPrice: 9.99,
			sellPrice: 14.99,
			sku: 'WB-013',
			unit: 'pair',
		},
		{
			name: 'Thermostat',
			description: 'Efficient thermostat for optimal engine temperature',
			buyPrice: 12.99,
			sellPrice: 17.99,
			sku: 'TH-014',
			unit: 'part',
		},
		{
			name: 'Oxygen Sensor',
			description: 'High-quality oxygen sensor for accurate fuel-air mixture',
			buyPrice: 29.99,
			sellPrice: 44.99,
			sku: 'OS-015',
			unit: 'piece',
		},
		{
			name: 'Ignition Coil',
			description: 'Reliable ignition coil for consistent sparks',
			buyPrice: 18.99,
			sellPrice: 26.99,
			sku: 'IC-016',
			unit: 'piece',
		},
		{
			name: 'Fuel Filter',
			description: 'Effective fuel filter for clean fuel delivery',
			buyPrice: 7.99,
			sellPrice: 11.49,
			sku: 'FF-017',
			unit: 'part',
		},
		{
			name: 'Wheel Bearing',
			description: 'Durable wheel bearing for smooth wheel rotation',
			buyPrice: 15.99,
			sellPrice: 22.99,
			sku: 'WB-018',
			unit: 'piece',
		},
		{
			name: 'Exhaust Manifold',
			description: 'Sturdy exhaust manifold for efficient exhaust flow',
			buyPrice: 39.99,
			sellPrice: 54.99,
			sku: 'EM-019',
			unit: 'part',
		},
		{
			name: 'Shock Absorbers',
			description: 'High-performance shock absorbers for a smooth ride',
			buyPrice: 44.99,
			sellPrice: 64.99,
			sku: 'SA-020',
			unit: 'set',
		},
		{
			name: 'Serpentine Belt',
			description: 'Durable serpentine belt for reliable power transmission',
			buyPrice: 11.99,
			sellPrice: 16.99,
			sku: 'SB-021',
			unit: 'part',
		},
		{
			name: 'Ball Joint',
			description: 'Robust ball joint for stable suspension',
			buyPrice: 19.99,
			sellPrice: 28.99,
			sku: 'BJ-022',
			unit: 'piece',
		},
		{
			name: 'Power Steering Pump',
			description: 'Efficient power steering pump for smooth steering',
			buyPrice: 55.99,
			sellPrice: 79.99,
			sku: 'PSP-023',
			unit: 'piece',
		},
		{
			name: 'Fuel Injector',
			description: 'Precise fuel injector for optimal fuel delivery',
			buyPrice: 22.99,
			sellPrice: 32.99,
			sku: 'FI-024',
			unit: 'piece',
		},
		{
			name: 'Control Arm',
			description: 'Sturdy control arm for reliable suspension',
			buyPrice: 28.99,
			sellPrice: 41.99,
			sku: 'CA-025',
			unit: 'piece',
		},
		{
			name: 'Clutch Kit',
			description: 'Complete clutch kit for smooth gear engagement',
			buyPrice: 79.99,
			sellPrice: 109.99,
			sku: 'CK-026',
			unit: 'set',
		},
		{
			name: 'Ignition Switch',
			description: 'Durable ignition switch for reliable starting',
			buyPrice: 14.99,
			sellPrice: 21.99,
			sku: 'IS-027',
			unit: 'part',
		},
		{
			name: 'Wheel Cylinder',
			description: 'Efficient wheel cylinder for reliable brake performance',
			buyPrice: 9.49,
			sellPrice: 13.99,
			sku: 'WC-028',
			unit: 'piece',
		},
		{
			name: 'Starter Motor',
			description: 'Powerful starter motor for reliable engine starting',
			buyPrice: 49.99,
			sellPrice: 74.99,
			sku: 'SM-029',
			unit: 'piece',
		},
		{
			name: 'Intake Manifold',
			description: 'Optimized intake manifold for efficient air intake',
			buyPrice: 35.99,
			sellPrice: 49.99,
			sku: 'IM-030',
			unit: 'part',
		},
	],
};

export default DEMO_CONFIG;
