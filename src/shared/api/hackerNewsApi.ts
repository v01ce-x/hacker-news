import type { Story } from '@/shared/api/types.ts';

export const hackerNewsApi = {
  getNewStoryIds: async (): Promise<number[]> => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/newstories.json`,
    );
    const ids: number[] = await response.json();

    return ids.slice(0, 100);
  },

  getItemById: async <T>(id: number): Promise<T | null> => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/item/${id}.json`,
    );

    return await response.json();
  },

  fetchTopNews: async (): Promise<Story[]> => {
    const ids = await hackerNewsApi.getNewStoryIds();

    const stories = await Promise.all(
      ids.map((id) => hackerNewsApi.getItemById<Story>(id)),
    );

    return stories
      .filter((item: Story) => Boolean(item && !('deleted' in item)))
      .sort((a, b) => b.time - a.time);
  },
};
