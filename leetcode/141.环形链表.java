import java.util.HashSet;

/*
 * @lc app=leetcode.cn id=141 lang=java
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        //1.哈希表  时空：O(N) 
        //用来存放遍历过的值
        // Set<ListNode> nodeSeen = new HashSet<>();
        // //遍历
        // while (head !=null) {
        //     //如果已经存在
        //     if (nodeSeen.contains(head)) {
        //         return true;
        //     }else {//如果是新的节点
        //         nodeSeen.add(head);
        //     }
        //     //指向下一个
        //     head = head.next;
        // }
        //return false;
        //2.快慢指针 龟兔赛跑，慢--1  快--2 当相遇时，即为true
        //如果在移动的过程中，快指针反过来追上慢指针，就说明该链表为环形链表
        //时间 O(N) 空间：O(1)
        if (head == null || head.next == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
    }
}
// @lc code=end

