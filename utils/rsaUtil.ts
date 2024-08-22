import JSEncrypt from "jsencrypt";
/**
 * RSA加密
 * @param str
 * @returns {*}
 */
function rsaEncrypt(str: string) {
  let key =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYZVf82JIXF87mFotYRkQwE86rhiWJmUPiSL/Zei0Lp9oIRuoHOqmfKB8I/kCdcBkcC3GUdRIrmDLwPJ+tM9y3IebXeqik0BX6epq3b4wSsRzHEdgvfe7DQwyH60GSDtlgtjctnIQSVzNMjAHD5L8iOp6bvJuPFQznAEd726KCxQIDAQAB",
    Encrypt = new JSEncrypt();
  Encrypt.setPublicKey(key);
  return Encrypt.encrypt(str);
}
export default rsaEncrypt;