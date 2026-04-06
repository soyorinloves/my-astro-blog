// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other" | "game";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	// Frontend Skills
	{
		id: "CSharp",
		name: "CSharp",
		description:
			"专注于 Unity 游戏开发的 C# 编程，精通游戏逻辑、组件脚本、协程、异步、UGUI 与场景管理。",
		icon: "logos:csharp",
		category: "game",
		level: "advanced",
		experience: { years: 0, months: 3 },
		projects: [
			"Unity 2D 小游戏",
			"3D 角色控制系统",
			"Unity UI 界面框架",
		],
		color: "#F7DF1E",
	},
];
