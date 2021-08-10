import java.util.HashMap;

/*
 * @lc app=leetcode.cn id=1 lang=java
 *
 * [1] 两数之和
 */

// @lc code=start
class Solution {
    public int[] twoSum(int[] nums, int target) {
        //1.暴力法 N^2
        // for(int i=0; i < nums.length;i++) {
        //     for (int j = i+1; j<nums.length; j++) {
        //         if (target == nums[i] + nums[j]) {
        //             return new int[] {i,j};
        //         }
        //     }
        // }
        //2.hashMap N
        HashMap<Integer,Integer> map = new HashMap<>();
        for (int i=0; i<nums.length; i++) {
            map.put(nums[i], i);
        }
        for (int j=0; j <nums.length;j++) {
            if (map.containsKey(target-nums[j]) && map.get(target-nums[j])!=j) {
                return new int[] {j,map.get(target-nums[j])};
            }
        }
        return new int[] {0};
        
    }
}
// @lc code=end

