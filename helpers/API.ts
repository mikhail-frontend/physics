import type {getDataType, postDataType} from "~/types";

class Api {
    getData: getDataType;
    postData: postDataType;

    initialize({getData, postData}) {
        this.getData = getData;
        this.postData = postData;
    }
}

const instanceApi = new Api();
export default instanceApi;