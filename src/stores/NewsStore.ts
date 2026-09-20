import { makeAutoObservable, runInAction } from 'mobx';
import { hackerNewsApi, type Story } from '@/shared/api';

export class NewsStore {
  private timerId: number | null = null;

  news: Story[] | [] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchNews = async () => {
    try {
      this.isLoading = true;
      const data = await hackerNewsApi.fetchTopNews();

      runInAction(() => {
        this.news = data;
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };

  startAutoRefresh = () => {
    void this.fetchNews();
    this.timerId = window.setInterval(this.fetchNews, 60000);
  };

  stopAutoRefresh = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  };
}

export const newsStore = new NewsStore();

export const useNewsStore = () => newsStore;
