import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 * @lc app=leetcode.cn id=15 lang=java
 *
 * [15] 三数之和
 */

// @lc code=start
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        //数组遍历 + 左右指针 N^2
        List<List<Integer>> res =  new ArrayList<>();
        int len = nums.length;
        if (nums == null || len < 3) {
            return res;
        }
        //排序操作  小->大
        Arrays.sort(nums);
        for (int i = 0; i <len; i++) {
            //如果当前数字大于0，即后面的数字都大于0，所以结束循环
            if (nums[i]>0) break;
            //去重  当前后两数相等，会出现重复操作（前面已经排序）
            if (i>0 && nums[i] == nums[i-1]) continue;
            //左右指针，收敛
            int L = i+1;
            int R = len-1;
            // L < R 正常计算
            while (L < R) {
                int sum = nums[i] + nums[L] + nums[R];
                //三数之和为0，添加进数组，再进行去重操作
                if (sum==0) {
                    res.add(Arrays.asList(nums[i],nums[L],nums[R]));
                    //去重
                    while (L<R && nums[L] == nums[L+1]) L++;
                    while (L<R && nums[R] == nums[R-1]) R--;
                    L++;
                    R--;
                }
                //当sum小于0，则说明当前L的值比较小，向右的值更大，寻找匹配
                else if (sum<0) L++;
                //当sum大于0，则说明当前R的值太大，向左的值更小，寻找匹配
                else if (sum>0) R--;

            }

        }
        return res;
    }
}
// @lc code=end

