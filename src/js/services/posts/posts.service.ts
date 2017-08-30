import mz from 'domains';
export class Posts extends IPosts {

	public getPosts(postUuid: string): ng.IPromise<any> {
		// geoplugin.com
		return this.RestProxy.handleGetCall(``);
	}

}

let basicInfoDaoFactory: Function = (RestProxy: mz.IRestProxy): mz.IBasicInfoDao => {
	return new BasicInfoDao(RestProxy);
};

basicInfoDaoFactory.$inject = ['RestProxy'];

export default basicInfoDaoFactory;
