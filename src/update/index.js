import 'antd/dist/antd.min.css';
import { Form, Divider, Input, InputNumber, Button, Upload } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditPage(){
    const params = useParams();
    const { id } =  params;
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ product, setProduct ] = useState(null);
    const [ value, setValue ] = useState(null);
    console.log(id);
    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`)
        .then((result)=>{
            setProduct(result.data.product);
            console.log(result.data);
            setImageUrl(product.imageUrl);
            setValue('hi');
        })
        .catch((error)=>{
            console.error(error);
        })
    },[])
    
    //이미지 처리함수
    const onChangeImage = (info) => {
        //파일이 업로드 중일때
        if(info.file.status === 'uploading'){
            return;
        }
        //파일이 업로드 완료했을때
        if(info.file.status === 'done'){
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl);
        }
    }
    function textChange(e){
        const text = e.target.value;
        setValue(text);
    }
    return(
        <div id="update" className="innerCon">
            <h2>상품등록하기</h2>
            <Form name="상품업로드" >
                <Form.Item name="upload" label={<div className="upload-label">상품 사진</div>}>
                    <Upload name="image" 
                    action="http://localhost:8080/image"
                    listType="picture"
                    onChange={onChangeImage}
                    showUploadList = {false}
                    >
                    {/* 이미지가 있으면 이미지를 나타내고 없으면 이미지 업로드 해주세요가 나타나도록설정 */}
                    {
                    imageUrl ? (<img src={`${imageUrl}`} alt="이미지" width="200" />) : (
                        <div id="upload-img">
                        <img src="/images/icons/camera.png" alt="카메라" />
                        <span>이미지를 업로드 해주세요</span>
                    </div>)
                    }
                  
                    </Upload>
                </Form.Item>
                <Form.Item name="seller" label={<div className="upload-label">판매자명</div>}
                    rules={[{ required: true, message:"판매자 이름을 입력해 주세요"}]}
                >
                    <Input placeholder="판매자 이름을 입력해주세요" className="upload-name" />
                </Form.Item>
                <Divider />
                <Form.Item name="name" label={<div className="upload-label">상품명</div>}
                    rules={[{ required: true, message:"상품 이름을 입력해 주세요"}]}
                >
                    <Input value={value}  onChange={textChange} placeholder="상품 이름을 입력해주세요" className="upload-name" />
                </Form.Item>
                <Divider />
                <Form.Item name="price" label={<div className="upload-label">상품가격</div>}
                    rules={[{ required: true, message:"가격을 입력해 주세요"}]}
                >
                    <InputNumber size="large" defaultValue={0} />
                </Form.Item>
                <Divider />
                <Form.Item name="description" label={<div className="upload-label">상품소개</div>}>
                    <Input.TextArea 
                        placeholder="상품소개를 적어주세요"
                        maxLength={400}
                    />
                </Form.Item>
                <Divider />
                <Form.Item>
                    <Button size="large" htmlType="submit">상품등록하기</Button>
                    <Button size="large" htmlType="reset">취소</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default EditPage;