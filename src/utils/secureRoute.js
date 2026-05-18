import { decryptData, encryptData } from "./crypto";


/**
 * Send encrypted data via query params
 */
export const sendSecureParams = (router, path, data) => {
    try {
        const encrypted = encryptData(data);

        if (!encrypted) return;

        const encoded = encodeURIComponent(encrypted);

        router.push(`${path}?data=${encoded}`);
    } catch (error) {
        console.error("Send Params Error:", error);
    }
};
// --------------use-when-send-----------------
//  const router = useRouter()
// sendSecureParams(router, "/otp", responseData);

/**
 * Get and decrypt params
 */
export const getSecureParams = (searchParams) => {
    try {
        const encrypted = searchParams.get("data");

        if (!encrypted) return null;

        const decoded = decodeURIComponent(encrypted);

        const decrypted = decryptData(decoded);
        if (!decrypted) {
            console.warn("Tampered or invalid data");
            return null;
        }
        return decrypted;
    } catch (error) {
        console.error("Get Params Error:", error);
        return null;
    }
};

// --------------use-when-get-----------------
// const searchParams = useSearchParams();
//   useEffect(() => {
//     const data = getSecureParams(searchParams);

//     console.log("Decrypted Data:", data);

//     // use data
//   }, [searchParams]);