/*
 * @lc app=leetcode.cn id=189 lang=java
 *
 * [189] 旋转数组
 */

// @lc code=start
class Solution {
    public void rotate(int[] nums, int k) {
        // 时空 O(N)
        int len = nums.length;
        int[] newArray = new int[len];
        for (int i = 0; i < len; i++) {
           newArray[(i+k) % len] = nums[i];
        }
        System.arraycopy(newArray, 0, nums, 0, len);
    }
}
// @lc code=end

