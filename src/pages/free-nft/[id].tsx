import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Snackbar,
	Alert,
	Grid,
	TextField,
	Button,
} from "@mui/material";
import Lottie from "lottie-react";
import successAnimationData from "../../utils/lottie/success.json";
import { useAccount } from "wagmi";
import { claimFreeNft } from "../../components/api";

const Collection: NextPage = () => {
	const { address } = useAccount();
	const router = useRouter();
	const { id } = router.query;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [walletAddress, setWalletAddress] = useState("");

	const [err, setErr] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async () => {
		setErr(null);

		try {
			await claimFreeNft({
				name,
				email,
				web3_public_address: walletAddress,
				client: "maar-sutteya",
			});
			setSuccess(true);
		} catch (err: any) {
			setErr(err?.response?.data?.error);
		}
	};

	useEffect(() => {
		if (id && id !== "maar-sutteya") {
			router.push("/");
		}
	}, [id]);

	useEffect(() => {
		if (address) {
			setWalletAddress(address);
		}
	}, [address]);

	return id ? (
		<>
			<Box
				sx={{
					backgroundImage: `linear-gradient(0deg, rgba(15, 33, 46, 0.75), rgba(15, 33, 46, 0.75)), url(https://hey-nft.s3.ap-south-1.amazonaws.com/Gajendra+Verma+/Tier+1-+Poster/Maar+Sutteya_Poster+for+Hey.png)`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<Box
					margin="auto"
					display="flex"
					justifyContent="space-between"
					flexDirection="column"
					paddingX={2}
					sx={{
						minHeight: "100vh",
						maxWidth: 1200,
					}}
				>
					{!success ? (
						<Box margin="auto" maxWidth={500} width="100%">
							<Box mb={2}>
								<Typography
									variant="h2"
									sx={{ fontFamily: "Syne" }}
									textAlign="center"
								>
									Enter details
								</Typography>
							</Box>
							<Box mb={6}>
								<Typography
									variant="body2"
									textAlign="center"
									sx={{
										color: "grey",
										span: {
											background:
												"linear-gradient(#FD8900, #FFBA56)",
											WebkitBackgroundClip: "text",
											WebkitTextFillColor: "transparent",
										},
									}}
								>
									Enter your details to receive the{" "}
									<span>FREE</span> NFT
								</Typography>
							</Box>
							<Box mb={2}>
								<TextField
									label="Wallet address"
									placeholder="Wallet address"
									value={walletAddress}
									onChange={(e) =>
										setWalletAddress(e.target.value)
									}
									required={walletAddress.trim() === ""}
									fullWidth
								/>
							</Box>
							<Box mb={2}>
								<TextField
									label="Name"
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required={name.trim() === ""}
									fullWidth
								/>
							</Box>
							<Box mb={4}>
								<TextField
									label="Email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required={email.trim() === ""}
									fullWidth
								/>
							</Box>
							<Box display="flex" justifyContent="center">
								<Button
									fullWidth
									variant="contained"
									disabled={
										walletAddress.trim() === "" ||
										name.trim() === "" ||
										email.trim() === ""
									}
									onClick={() => handleSubmit()}
								>
									Submit details
								</Button>
							</Box>
						</Box>
					) : (
						<>
							<Box
								mt={16}
								marginX="auto"
								maxWidth={450}
								paddingX={8}
								paddingY={6}
								sx={{
									background: "rgba(255, 255, 255, 0.06)",
									border: "1px solid #4D4D4D",
									backdropFilter: "blur(24px)",
									borderRadius: 4,
								}}
							>
								<Lottie
									animationData={successAnimationData}
									loop={true}
								/>
								<Typography
									variant="body1"
									textAlign="center"
									component={"div"}
									sx={{
										color: "grey",
									}}
								>
									Congratulations! You have just claimed a NFT
									which will be transferred within 48 hours!
								</Typography>
							</Box>
							<Box
								margin="auto"
								maxWidth={450}
								paddingX={8}
								paddingY={6}
								sx={{
									background: "rgba(255, 255, 255, 0.06)",
									border: "1px solid #4D4D4D",
									backdropFilter: "blur(24px)",
									borderRadius: 4,
								}}
							>
								<Typography
									variant="h4"
									textAlign="center"
									component={"div"}
								>
									Be a part of our community
								</Typography>
								<Typography
									variant="body2"
									textAlign="center"
									component={"div"}
									sx={{
										color: "grey",
									}}
								>
									Follow the Gajendra Verma discord for more
									information
								</Typography>
								<Box mt={2}>
									<Button
										fullWidth
										variant="contained"
										onClick={() =>
											window.open(
												"https://discord.gg/bxMJJj6nnn"
											)
										}
									>
										<Image
											src={`/assets/discord.svg`}
											alt="discord"
											width={25}
											height={25}
										/>
										<Box component={"span"} ml={1}>
											Discord
										</Box>
									</Button>
								</Box>
							</Box>
						</>
					)}

					<Box
						display="flex"
						justifyContent="end"
						alignItems="center"
					>
						<Typography variant="body2" sx={{ mr: 2 }}>
							Powered by
						</Typography>
						{/* <img src={Logo} alt="logo" onClick={() => router.push("/")} /> */}
						<Image
							src={"/logo.svg"}
							alt="logo"
							width={60}
							height={60}
						/>
					</Box>
				</Box>
			</Box>
			{err && (
				<Snackbar
					open={err ? true : false}
					autoHideDuration={3000}
					onClose={() => setErr(null)}
				>
					<Alert
						onClose={() => setErr(null)}
						severity="error"
						sx={{ width: "100%" }}
					>
						{err || "Unexpected error!"}
					</Alert>
				</Snackbar>
			)}
		</>
	) : null;
};

export default Collection;
