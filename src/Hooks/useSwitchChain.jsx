import { CHAINID } from "../utils/Constant";

export const useSwitchChain = async () => {
    const { handleError } = useErrorMessage();
    const switchChain = async () => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(CHAINID) }]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: "wallet_addEthereumChain",
                        params: [networkParams[toHex(CHAINID)]]
                    });
                } catch (error) {
                    handleError(error)
                }
            }
            if (switchError.code === 4001) {
                try {
                    handleError("Please switch correct network");
                    // deactivate();
                } catch (err) {
                    handleError(err);
                }
            }
        }
    };

    return {switchChain}
}