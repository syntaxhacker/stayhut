import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
	Layout,
	Radio,
	Typography,
	Upload,
	Input,
	InputNumber,
	Button,
	Spin,
} from "antd";
import { HOST_LISTING } from "../../lib/graphql/mutations";
import {
	HostListing as HostListingData,
	HostListingVariables,
} from "../../lib/graphql/mutations/HostListing/__generated__/HostListing";
import { Viewer } from "../../lib/graphql/types";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { ListingType } from "../../lib/graphql/globalTypes";
import {
	HomeOutlined,
	BankOutlined,
	PlusOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import {
	iconColor,
	displayErrorNotification,
	displaySuccessNotification,
} from "../../lib/utils";
import { UploadChangeParam } from "antd/lib/upload";
import { useMutation } from "react-apollo";
import { useScrollToTop } from "../../lib/hooks";
interface Props {
	viewer: Viewer;
}

const { Content } = Layout;
const { Text, Title } = Typography;

const Host = ({ viewer }: Props) => {
	const [imageLoading, setImageLoading] = useState(false);
	const [imageBase64value, setImageBase64value] = useState<string | null>(
		null
	);

	const [hostListing, { loading, data }] = useMutation<
		HostListingData,
		HostListingVariables
	>(HOST_LISTING, {
		onCompleted: () => {
			displaySuccessNotification("listing created");
		},
		onError: () => {
			displayErrorNotification("cant create listing at the moment");
		},
	});
	useScrollToTop();
	const handleImageUpload = (info: UploadChangeParam) => {
		const { file } = info;
		if (file.status === "uploading") {
			setImageLoading(true);
			return;
		}

		if (file.status === "done" && file.originFileObj) {
			getBase64Value(file.originFileObj, (imageBase64value) => {
				setImageBase64value(imageBase64value);
				setImageLoading(false);
			});
		}
	};
	if (loading) {
		const spinningIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
		return (
			<Content className="host-content">
				<div className="host__form-header">
					<Spin size="large" indicator={spinningIcon}></Spin>
					<Title level={3} className="host__form-title">
						Creating...
					</Title>
				</div>
			</Content>
		);
	}

	if (data && data.hostListing) {
		return <Redirect to={`/listing/${data.hostListing.id}`} />;
	}

	if (!viewer.id) {
		return (
			<Content className="host-content">
				<div className="host__form-header">
					<Title level={4} className="host__form-title">
						You'll have to be signed in and connected with Stripe to
						host a listing!
					</Title>
					<Text type="secondary">
						We only allow users who've signed in to our application
						and have connected with Stripe to host new listings. You
						can sign in at the <Link to="/login">/login</Link> page
						and connect with Stripe shortly after.
					</Text>
				</div>
			</Content>
		);
	}

	if (viewer.id && !viewer.hasWallet) {
		return (
			<Content className="host-content">
				<div className="host__form-header">
					<Title level={4} className="host__form-title">
						You have to be connected with Stripe to host a listing!
					</Title>
					<Text type="secondary">
						We only allow users who had connected with Stripe to
						host listings. You can connect with Stripe on your{" "}
						<Link to={`/user/${viewer.id}`}>profile</Link> page.
					</Text>
				</div>
			</Content>
		);
	}
	const handleHostListing = (values: any) => {
		const fullAddress = `${values.address},${values.city},${values.state},${values.postalCode}, `;
		const input = {
			...values,
			address: fullAddress,
			image: imageBase64value,
		};
		delete input.city;
		delete input.state;
		delete input.postalCode;

		hostListing({
			variables: {
				input,
			},
		});
	};

	return (
		<Content className="host-content">
			<Form layout="vertical" onFinish={handleHostListing}>
				<div className="host__form-header">
					<Title level={3} className="host__form-title">
						Create a Listing
					</Title>
				</div>

				<FormItem
					name="type"
					label="Home Type"
					rules={[{ required: true }]}
				>
					<Radio.Group>
						<Radio.Button value={ListingType.APARTMENT}>
							<HomeOutlined style={{ color: iconColor }} />
							<span> Apartment</span>
						</Radio.Button>
						<Radio.Button value={ListingType.HOUSE}>
							<BankOutlined style={{ color: iconColor }} />
							<span> House</span>
						</Radio.Button>
					</Radio.Group>
				</FormItem>

				<FormItem
					name="numOfGuests"
					label="Maximum Number Of Guests"
					rules={[
						{
							required: true,
							message: "enter the number of guests",
						},
					]}
				>
					<InputNumber min={1} placeholder="4" />
				</FormItem>

				<FormItem
					name="title"
					label="Title"
					rules={[{ required: true, message: "enter title" }]}
				>
					<Input placeholder="input" maxLength={45} />
				</FormItem>

				<FormItem
					label="Description"
					name="description"
					extra="MAX Char count of 400"
					rules={[
						{ required: true, message: "enter valid desciption" },
					]}
				>
					<TextArea
						rows={3}
						placeholder="best hotel period"
						maxLength={400}
					/>
				</FormItem>

				<FormItem
					label="Address"
					name="address"
					rules={[{ required: true, message: "enter valid address" }]}
				>
					<Input placeholder="address" />
				</FormItem>

				<FormItem
					label="City/Province"
					name="city"
					rules={[{ required: true, message: "enter valid city" }]}
				>
					<Input placeholder="city" />
				</FormItem>

				<FormItem
					label="State"
					name="state"
					rules={[{ required: true, message: "enter valid state" }]}
				>
					<Input placeholder="state" />
				</FormItem>

				<FormItem
					label="Image"
					name="image"
					extra="image should be within 1MB"
					rules={[{ required: true, message: "upload image" }]}
				>
					<div className="host__form-image-upload">
						<Upload
							name="image"
							listType="picture-card"
							showUploadList={false}
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							beforeUpload={beforeUpload}
							onChange={handleImageUpload}
						>
							{imageBase64value ? (
								<img src={imageBase64value} alt="houseimage" />
							) : (
								<div>
									{imageLoading ? (
										<LoadingOutlined />
									) : (
										<PlusOutlined />
									)}
									<div className="ant-upload-text">
										Upload
									</div>
								</div>
							)}
						</Upload>
					</div>
				</FormItem>

				<FormItem
					label="Zip Code"
					name="postalCode"
					rules={[{ required: true, message: "enter valid zipcode" }]}
				>
					<Input placeholder="enter zip code " />
				</FormItem>

				<FormItem
					label="Price"
					extra="Price in Rupees"
					name="price"
					rules={[{ required: true, message: "enter valid price" }]}
				>
					<InputNumber min={0} formatter={(value) => `₹${value}`} />
				</FormItem>

				<FormItem>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</FormItem>
			</Form>
		</Content>
	);
};
const beforeUpload = (file: File) => {
	const fileIsValidImage =
		file.type === "image/jpeg" || file.type === "image/png";
	const fileValidSize = file.size / 1024 / 1024 < 1;

	if (!fileIsValidImage) {
		displayErrorNotification(
			"file is not a valid image type upload png or jpg"
		);
		return false;
	}

	if (!fileValidSize) {
		displayErrorNotification("file is not a valid size");
		return false;
	}

	return fileIsValidImage && fileValidSize;
};
const getBase64Value = (
	img: File | Blob,
	callback: (imageBase64value: string) => void
) => {
	const reader = new FileReader();
	reader.readAsDataURL(img);
	reader.onload = () => {
		callback(reader.result as string);
	};
};

export default Host;
