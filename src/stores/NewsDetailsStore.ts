import { makeAutoObservable, runInAction } from 'mobx';
import { hackerNewsApi, type Story } from '@/shared/api';

export interface CommentItemData {
  id: number;
  by?: string;
  time: number;
  text?: string;
  kids?: number[];
  deleted?: boolean;
  dead?: boolean;
}

class NewsDetailsStore {
  detailsNews: Story | null = null;
  isLoading = false;

  comments: Record<number, CommentItemData> = {};
  isCommentsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCurrentNews = async (id: number) => {
    this.isLoading = true;
    this.comments = {};

    try {
      const response = await hackerNewsApi.getItemById<Story>(id);
      runInAction(() => {
        this.detailsNews = response;
      });

      if (response?.kids && response.kids.length > 0) {
        void this.fetchComments(response.kids);
      }
    } catch (error) {
      console.error('Ошибка при загрузке новости:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  fetchComments = async (ids: number[]) => {
    const missingIds = ids.filter((id) => !this.comments[id]);
    if (missingIds.length === 0) return;

    this.isCommentsLoading = true;

    try {
      const fetched = await Promise.all(
        missingIds.map((id) => hackerNewsApi.getItemById<CommentItemData>(id)),
      );

      runInAction(() => {
        fetched.forEach((comment) => {
          if (comment && !comment.deleted && !comment.dead) {
            this.comments[comment.id] = comment;
          }
        });
      });
    } catch (error) {
      console.error('Ошибка загрузки комментариев:', error);
    } finally {
      runInAction(() => {
        this.isCommentsLoading = false;
      });
    }
  };

  clear = () => {
    this.detailsNews = null;
    this.comments = {};
  };
}

const newsDetailsStore = new NewsDetailsStore();
export const useNewsDetailsStore = () => newsDetailsStore;
