// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	{
		id: 1,
		content:
			"我创建了网站！",
		date: "2026-04-06T10:30:00Z",
		images: ["/images/diary/diary4.6.jpg", "/images/diary/1.webp"],
	},
		{
		id: 2,
		content:
			"今天主要泡在 C# 里，终于把面向对象这一大块完整学完了，感觉脑子又清晰了一点，总算没白熬。中途歇了会儿，打开《博德之门 3》继续推剧情，刚打到第二章幽影之地，地图一换，氛围直接拉满，有点上头。",
		date: "2026-04-12T10:30:00Z",
		images: [],
	},
];

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = [...diaryData].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	diaryData.forEach((item) => {
		if (item.tags) {
			item.tags.forEach((tag) => tags.add(tag));
		}
	});
	return Array.from(tags).sort();
};
