import axios from 'axios';

// 增加默认的请求路径
//axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'http://localhost:8880';
// 增加拦截器
axios.interceptors.response.use((response) => {
  return response.data.data;// 在这里统一拦截结果，把结果处理成response.data
});

// 获取轮播图数据 返回一个promise对象
export let getSliders = () => {
  return axios.get('/nba/sliders');
};
// 获取热门图书接口
export let getHotBook = () => {
  return axios.get('/hot');
};

// 获取全部图书
export let getBook = () => {
  return axios.get('/book');
};

// 删除某一本图书
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`);
};

// 获取谋一本书
export let findOneBook = (id) => {
  return axios.get(`/book?id=${id}`);
};

// 修改图书
/**
 *
 * @param id 编号
 * @param data 请求体参数
 * @returns {AxiosPromise<any>}
 */
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data);
};

export let addBook = (data) => {
  return axios.post('/book', data);
};

export let getAll = () => {
  return axios.all([getSliders(), getHotBook()]);
};
export let query = (data) => {
  return axios.post('/animal-hospital/query', data);
}
/**
 * 根据偏移量返回对应的数据
 * @returns {AxiosPromise<any>}
 */
export let pagination = (offset) => {
  return axios.get(`/page?offset=${offset}`);
};

//获取各位置球员身高
export let getHeight = () => {
  return axios.get('/nba/height');
};

export let getData = () => {
  return axios.get('/nba/top10');
}
