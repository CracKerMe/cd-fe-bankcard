/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
import bankcardList from './bankcardList';

interface IAliCardRes {
  cardType: string;
  bank: string;
  key: string;
  messages?: [];
  validated?: boolean;
  stat?: string;
}
interface IBankInfo {
  bankName: string;
  bankCode: string;
  cardType: string;
  cardTypeName?: string;
}
const cardTypeMap:Record<string, string> = {
  DC: '储蓄卡',
  CC: '信用卡',
  SCC: '准贷记卡',
  PC: '预付费卡',
};
const getCardTypeName = (sign: keyof typeof cardTypeMap): string | undefined => cardTypeMap[sign] || undefined;

const getBankNameByBankCode = (bankcode: string): string => {
  for (let index = 0; index < bankcardList.length; index++) {
    const bankcard = bankcardList[index];
    if (bankcode === bankcard.bankCode) {
      return bankcard.bankName;
    }
  }
  return '';
};
const getBankInfoByCardNo = (cardNo: string): Promise<IBankInfo> => new Promise((resolve, reject) => {
  for (let i = 0, len = bankcardList.length; i < len; i++) {
    const bankcard = bankcardList[i];
    const { patterns } = bankcard;
    for (let j = 0, jLen = patterns.length; j < jLen; j++) {
      const pattern = patterns[j];
      if ((new RegExp(pattern.reg)).test(cardNo)) {
        const { cardType } = pattern;
        const info = {
          bankName: bankcard.bankName,
          bankCode: bankcard.bankCode,
          cardType,
          cardTypeName: getCardTypeName(cardType),
        };
        resolve(info);
      }
    }
  }
  fetch(`https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${cardNo}&cardBinCheck=true`)
    .then((response) => response.json())
    .then((data: IAliCardRes) => {
      const result = {
        bankName: getBankNameByBankCode(data.bank),
        bankCode: data.bank,
        cardType: data.cardType,
        cardTypeName: getCardTypeName(data.cardType),
      };
      resolve(result);
    }).catch((e) => {
      reject(new Error(e));
    });
});
const isString = (value: unknown) => {
  const type = typeof value;
  return type === 'string' || (type === 'object' && value != null && !Array.isArray(value));
};
function getBankBin(cardNo: number): Promise<IBankInfo> {
  return new Promise((resolve, reject) => {
    if (isString(cardNo)) {
      reject(new TypeError('银行卡号必须为number类型'));
    } else if (cardNo.toString().length < 15 || cardNo.toString().length > 19) {
      reject(new TypeError(`${cardNo}:银行卡位数必须是15到19位`));
    }
    getBankInfoByCardNo(cardNo.toString()).then((res) => {
      resolve(res);
    }).catch((e) => {
      reject(e);
    });
  });
}

const BIN = {
  getBankBin,
};

export default BIN;
