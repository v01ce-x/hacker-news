import { makeAutoObservable, runInAction } from 'mobx';
import { hackerNewsApi, type Story } from '@/shared/api';

class NewsStore {
  private timerId: number | null = null;

  news: Story[] | [] = [];
  isLoading: boolean;

  constructor() {
    makeAutoObservable(this);
  }

  fetchNews = async () => {
    try {
      this.isLoading = true;
      const response = await hackerNewsApi.fetchTopNews();

      runInAction(() => {
        this.news = response;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  startAutoRefresh = () => {
    void this.fetchNews();
    this.timerId = window.setInterval(this.fetchNews, 60000000);
  };

  stopAutoRefresh = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  };
}

const newsStore = new NewsStore();

export const useNewsStore = () => newsStore;
